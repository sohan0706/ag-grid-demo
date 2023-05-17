import React, { useState, useEffect, memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSelector, useDispatch } from 'react-redux';
import { setApiParams } from './store';

const Passenger = memo(() => {

  const apiParams = useSelector((state) => state?.passenger?.apiParams);
  const dispatch = useDispatch();

  const [gridApi, setGridApi] = useState(null);
  // define column
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name', headerName: 'Name' , flex: 1 , filter: 'agTextColumnFilter' , sortable: true, cellStyle: { textAlign: 'left' }},
    { field: 'trips', headerName: 'Trips', flex: 1, filter: 'agTextColumnFilter', sortable: true, cellStyle: { textAlign: 'left' }},
  ]);

  // set previous sort, filter and page data
  const setDefualtApiParams = () => {
    if(gridApi?.current){
        const { sortModel, filterModel } = apiParams;
        if (sortModel) {
            gridApi.current.setSortModel(sortModel);
        }
        if (filterModel) {
            gridApi.current.setFilterModel(filterModel);
        }
    }
  }

  // useEffect(() => {
  //   console.log("apiParams ", apiParams);
  // }, [apiParams]);

  const onGridReady = (params) => {
    setGridApi(params.api); 
  };

  useEffect(() => {
    // call api when page, filter or sort got changed.
    // we can use redux thunk to call api and store response in redux
    if (gridApi) {
      setDefualtApiParams(); 
      const dataSource = {
        getRows: (params) => {
          const { pageSize } = apiParams;
          const page = params.endRow / pageSize;
          // store api params to redux
          dispatch(setApiParams({
            ...apiParams,
            page: page,
            sortModel: params?.sortModel,
            filterModel: params?.filterModel,
          }));
          gridApi.showLoadingOverlay();
          fetch(`https://api.instantwebtools.net/v1/passenger?page=${page - 1}&size=${pageSize}`)
            .then(resp => resp.json())
            .then(res => {
              params.successCallback(res.data, res.totalPassengers);
              gridApi.hideOverlay();
            }).catch(err => {
              params.successCallback([], 0);
              gridApi.hideOverlay();
            });
        }
      }

      gridApi.setDatasource(dataSource);
    }
  }, [gridApi]);
  return (
    <>
    <h4>Passengers List</h4>
    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', padding: "0px 20px 10px 20px" }}>
      <AgGridReact
        columnDefs={columnDefs}
        pagination={true}
        rowModelType={'infinite'}
        paginationPageSize={apiParams?.pageSize}
        cacheBlockSize={apiParams?.pageSize}
        onGridReady={onGridReady}
        animateRows={true}
      >
      </AgGridReact>
    </div>
    </>
  );
});
export default Passenger;
