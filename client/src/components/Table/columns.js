export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Название фабрики',
    accessor: 'name',
  },
  {
    Header: 'Фото',
    accessor: 'image',
  },
  {
    Header: 'Адрес',
    accessor: 'address',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Телефон',
    accessor: 'phone',
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Image',
        accessor: 'image',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    ],
  },
];
