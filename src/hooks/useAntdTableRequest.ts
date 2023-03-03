import { useAntdTable } from 'ahooks';
import type { PaginationProps as AntdPaginationProps, TableProps as AntdTabProps } from 'antd';
type UseAntdTableType = typeof useAntdTable;

export type SearchType = ReturnType<UseAntdTableType>['search'];

// 只是用来配置表格默认属性
// 比如分页配置
const useAntdTableRequest: UseAntdTableType = (service, options) => {
  const result = useAntdTable(service, options);
  const { tableProps } = result;

  // 重新定义 <Table> 组件的 pagination 属性值
  // useAntdTable 提供的属性有限, 不支持 pagination 的全部属性
  // 在这里进行覆盖
  const paginationProps: AntdPaginationProps = {
    ...tableProps.pagination,
    showTotal: (total, range) => `第${range[0]}-${range[1]} 条/共 ${total} 条`,
    hideOnSinglePage: true
  };
  tableProps.pagination = paginationProps;

  // 重新定义 Table 组件的 onChange 事件, useAntdTable 的tableProps中包含有 onChage事件, 但有一个问题
  // antd 的Table onChage事件中, 会触发一个回调函数, 该函数有4个参数, 其中第四个参数包含 {action: string, curretDataSource: 当前表格的全部数据}
  // 在翻页时 useAntdTable 会把上面的 curretDataSource 也加到url参数上面, 你会看到一长串的请求参数
  // 在这里就是要去除curretDataSource这个参数
  const oldOnchage = tableProps.onChange;
  // 从这里可以点击查看 onChange 的类型定义
  const newOnChange: AntdTabProps<any>['onChange'] = (...props) => {
    let [page, filter, sorter, extra] = props;
    let pageValue = page,
      filterValue,
      sorterValue: any;

    // 排序字段处理
    if (Object.keys(sorter).length > 0) {
      if (Array.isArray(sorter)) {
        sorterValue = {};
        sorter.map((item) => {
          sorterValue[item.column?.dataIndex as string] = item.order;
        });
      } else {
        sorterValue = {
          [sorter.column?.dataIndex as string]: sorter.order
        };
      }
    }
    if (Object.keys(filter).length > 0) {
      filterValue = filter;
      console.log('filterrrrrrrrrrrrr', filter);
    }
    oldOnchage(pageValue, filterValue, sorterValue);
  };
  tableProps.onChange = newOnChange as any;

  // 表格尺寸
  result.tableProps.size = 'small';

  return result;
};

export default useAntdTableRequest;
