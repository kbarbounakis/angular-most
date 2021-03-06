/**
 * Created by Kyriakos Barbounakis<k.barbounakis@gmail.com> on 2/2/2015.
 */

function DataTableBaseController($scope, $q, $filter, DTOptionsBuilder, DTColumnBuilder) {
    CommonController($scope);
    //get dialog service
    var $svc, $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
    if ($injector) {
        //ensure application services
        if ($injector.has('$svc'))
            $svc = $injector.get('$svc');
    }

    var dtOptionsPromise = $q.defer();
    $scope.dtOptions = dtOptionsPromise.promise;


    $scope.init = function(model, view, filter, order, expand) {

        var q = new ClientDataQueryable(model), tableInstance;
        q.service = $svc;
        if (filter) {
            q.$filter=filter;
            q.prepare();
        }
        if (expand) {
            q.$expand=expand;
        }

        $scope.$on('data.filter', function(e, args) {
            if (angular.isDefined(args)) {
                if (angular.isDefined(args.model) && (args.model===model)) {
                    //delete prepared filter
                    delete q.$prepared;
                    //set filter and prepare
                    q.$filter = args.filter;
                    q.prepare();
                    $scope.filter = args.filter;
                    tableInstance.ajax.reload();
                }
            }
        });

        var dtOptions = DTOptionsBuilder.newOptions().withFnServerData(function(sSource, aoData, fnCallback, oSettings) {
            var skip = aoData[3].value, top = aoData[4].value, 
                columns  = angular.isArray($scope.dtColumns) ? $scope.dtColumns : $scope.dtColumns.$$state.value;
            if (aoData[2].value.length===0) {
                if (order) {
                    if (angular.isArray(order)) {
                        order.forEach(function(order) {
                            if (order.name) {
                                var ix = columns.findIndex(function(y) { return y.mData===order.name });
                                if (ix>=0) {
                                    aoData[2].value.push({ column:ix, dir:(order.dir || 'asc') });
                                }
                            }
                        });
                    }
                }
            }
            var orders = aoData[2].value;
            var searchFor=aoData[5].value;
            //clear order
            delete q.$orderby;
            if (angular.isArray(orders)) {
                orders.forEach(function(x) {
                    var column = aoData[1].value[parseInt(x.column)];
                    if (column) {
                        var colName2 = column.data;
                        if (/\./.test(column.data))
                            colName2 = column.data.replace(/\./g,'/');
                        if (x.dir==='desc') {
                            if (q.$orderby)
                                q.thenByDescending(colName2);
                            else
                                q.orderByDescending(colName2);
                        }
                        else {
                            if (q.$orderby)
                                q.thenBy(colName2);
                            else
                                q.orderBy(colName2);
                        }
                    }
                });
            }
            if (searchFor) {
                if ((searchFor.value.length > 0) && angular.isArray(columns)) {
                    var searchfilter;
                    var filter = [];
                    for (var i = 0; i < columns.length; i++) {
                        var col = columns[i];
                        if (col.bSearchable) {
                            var colName = col["mData"];
                            if (/\./.test(colName))
                                colName = col["mData"].replace(/\./g,'/');
                            filter.push("indexof(" + colName + ",'" + searchFor.value.replace(/'/g, "''") + "') ge 0");
                        }

                    }
                    searchfilter = filter.join(' or ');
                    q.filter(searchfilter);
                }
                else {
                    delete q.$filter;
                }
            }
            if (typeof q.$orderby === 'undefined' || q.$orderby == null) {
                if ($scope.dataView) {
                    if ($scope.dataView.order) {
                        q.$orderby = $scope.dataView.order;
                    }
                }
            }
            q.skip(skip).take(top).inlineCount(true).data().then(function(result) {
                var res  = {
                    recordsTotal:result.total,
                    recordsFiltered:result.total,
                    data:result.records
                };
                $scope.selected = null;
                delete $scope.selectedRowIndex;
                fnCallback(res);
            }, function(reason) {
                $scope.selected = null;
                delete $scope.selectedRowIndex;
                console.log(reason);
            });
        }).withOption('serverSide', true)
            .withTableTools()
            .withTableToolsButtons([])
            .withTableToolsOption("sRowSelect", "single")
            .withTableToolsOption("sSelectedClass", "selected")
            .withTableToolsOption("fnRowSelected", function ( nodes ) {
                var $table = $(nodes).closest('table').DataTable();
                $scope.$apply(function() {
                    var selected = $table.row(nodes[0]).data();
                    $scope.broadcast('item.selecting',selected);
                    $scope.selected = $table.row(nodes[0]).data();
                    $scope.broadcast('item.selected',selected);
                    $scope.selectedRowIndex = nodes[0]._DT_RowIndex;
                });
            })
            .withOption("fnInitComplete", function (oSettings, json) {
                if (angular.isArray(json.data)) {

                    tableInstance = oSettings.oInstance.DataTable();
                    $scope.setRowData = function(index, data) {
                        if (tableInstance) {
                            tableInstance.row(index).data(data);
                            //tableInstance.draw();
                        }
                    };

                    if (!/^true$/i.test(oSettings.oInstance.data('auto-select')))
                        return;
                    var selected = json.data[0];
                    if (typeof selected === 'undefined')
                        return;
                    $scope.broadcast('item.selecting',selected);
                    try {
                        TableTools.fnGetInstance(oSettings.oInstance[0]).s.dt.aoData[0]._DTTT_selected = true;
                        oSettings.oInstance.find('tbody>tr:first').toggleClass('selected');
                        $scope.selected = selected;
                        $scope.broadcast('item.selected',selected);
                        $scope.selectedRowIndex = 0;
                    }
                    catch (e) {
                        console.log('An error occured while trying to select row.');
                        console.log(e);
                    }
                }

            })
            .withTableToolsOption("fnRowDeselected", function (nodes) {
                $scope.$apply(function() {
                    $scope.selected = null;
                });
            })
            .withPaginationType('full_numbers')
            .withBootstrap()
            .withOption('lengthMenu',[5,10,25])
            .withOption('bFilter',true)
            .withOption('aaSorting',[])
            .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', nRow).unbind('click');
                $('td', nRow).bind('click', function(e) {
                    var $table = $(e.target).closest('table').DataTable();
                    var tableTools = TableTools.fnGetInstance($table[0]);
                    if (tableTools)
                        tableTools.fnSelect($(e.target));
                });
                return nRow;
            });
        //set scope.dtOptions
        $scope.dtOptions = dtOptions;
        var deferred = $q.defer(), promise = deferred.promise;
        $scope.dtColumns = promise;

        $svc.schema(model, function(err, schema) {
            if (err) {
                console.log(err);
                deferred.reject('Failed to get table columns.');
            }
            else {
                $scope.dataView = schema.views.find(function(x) { return x.name===view; });
                var reAlign = /^left$|^center$|^right$|^justify$/i;
                if (angular.isObject($scope.dataView)) {
                    var dtColumns = [];
                    dtColumns.name = $scope.dataView.name;
                    $scope.dataView.fields.forEach(function(field) {
                        var column = DTColumnBuilder.newColumn(field.name).withTitle(angular.loc(field.title));
                        if (angular.isDefined(field.sortable))
                            if (!field.sortable)
                                column.notSortable();
                        if (angular.isDefined(field.visible))
                            if (!field.visible)
                                column.notVisible();
                        var cssClass = [];
                        //get field css class , if any
                        if (angular.isDefined(field.cssClass)) {
                            cssClass.push(field.cssClass);
                        }
                        //get header align, if defined
                        var headerAlign = reAlign.exec(field.halign);
                        if (headerAlign) {
                            cssClass.push('dt-head-' + headerAlign[0]);
                        }
                        //get text align, if defined
                        var textAlign = reAlign.exec(field.align);
                        if (textAlign) {
                            cssClass.push('dt-' + textAlign[0]);
                        }
                        //apply styles
                        if (cssClass.length>0) {
                            column.withClass(cssClass.join(' '));
                        }
                        var format = field.format, coltype = field.coltype, href = field.href;
                        if ((field.type==="Integer") || (field.type==="Number"))
                            column.withOption("defaultContent","0");
                        else
                            column.withOption("defaultContent","-");
                        if (angular.isDefined(format)) {
                            column.renderWith(function(value) {
                                var formats=format.split("|");
                                var formattedValue=value;
                                for (var i = 0; i < formats.length; i++) {
                                    formattedValue= $filter(formats[i].replace(/(^\s*|\s*$)/g, ''))(formattedValue);
                                }
                                return formattedValue;
                            });
                        }
                        else {
                            if (coltype==='link') {
                                column.renderWith(function(value, type, row) {
                                    var row_href = String(href);
                                    if (row_href) {
                                        var re = /\{%(.*?)\}/i;
                                        var match = re.exec(row_href);
                                        while (match) {
                                            row_href = row_href.replace(match[0],row[match[1]]);
                                            match = re.exec(row_href);
                                        }
                                    }
                                    return angular.format('<a href="%s">%s</a>',row_href,value);
                                });
                            }
                        }
                        column.bSearchable=true;
                        if (angular.isDefined(field.searchable))
                            if (!field.searchable)
                                column.bSearchable=false;
                        dtColumns.push(column);
                    });
                    deferred.resolve(dtColumns);
                }
                else {
                    deferred.reject('Failed to get model view.');
                }
            }
        });

    };



}

function DataTableClientController($scope, $q, $filter, DTOptionsBuilder, DTColumnBuilder) {
    DataTableBaseController($scope, $q, $filter, DTOptionsBuilder, DTColumnBuilder);
    var q = new ClientDataQueryable($scope.client.route.current.model), filter;
    if (typeof $scope.client.route.current.filter !== 'undefined') {
        q.filter($scope.client.route.current.filter).prepare();
    }
    if (typeof $scope.client.route.$filter !=='undefined') {
        q.filter($scope.client.route.$filter).prepare();
    }
    //get filter
    filter = q.toFilter();
    $scope.init($scope.client.route.current.model, $scope.client.route.current.view, filter, $scope.client.route.current.order,$scope.client.route.current.expand);
}

function decodeURIComponentInternal(s) {
    if (typeof s === 'undefined' || s == null) {
        return;
    }
    return decodeURIComponent(s);
}

function DataTableVariantController($scope, $q, $filter, DTOptionsBuilder, DTColumnBuilder) {
    DataTableBaseController($scope, $q, $filter, DTOptionsBuilder, DTColumnBuilder);
    //watch options
    $scope.$watch('options', function(value) {
        if (angular.isDefined(value)) {
            $scope.init(value.$model, value.$view, decodeURIComponentInternal(value.$filter), decodeURIComponentInternal(value.$order),decodeURIComponentInternal(value.$expand));
            $q.when($scope.dtColumns).then(function(value) {
                $scope.dtColumns = value;
            }, function(reason) {
                $scope.dtColumns = [];
            });
        }
    });
}
//controllers
angular.module('most.data', ['datatables', 'datatables.bootstrap']).controller('DataTableVariantController', DataTableVariantController)
    .controller('DataTableClientController',DataTableClientController);