import {
  Button,
  Cascader,
  ConfigProvider,
  Image,
  Input,
  Pagination,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  theme,
} from 'antd'
import React from 'react'
import { UserAddOutlined, UserOutlined } from '@ant-design/icons'

import type { ColumnsType } from 'antd/es/table'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

interface DemosProps {
  dark?: boolean
}

const Demos = (props: DemosProps) => {
  const { dark } = props

  return (
    <div className={`${dark ? 'bg-black' : 'bg-gray-200'} p-2 [&>div]:my-4`}>
      <div>
        <button>
          <span className={`i-bx--home ${dark ? 'bg-gray-200' : 'bg-black'}`} />
        </button>
        <button className={`i-bx--home ${dark ? 'bg-gray-200' : 'bg-black'}`} />
      </div>
      <div>
        <Button className='text-sm text-sky-400' icon={<UserAddOutlined />}>
          Hello
        </Button>
        <Button
          disabled
          // I think it's okay to add extra condition of html attributes to change style
          className='text-sm [&[disabled]]:text-sky-400'
          icon={<UserAddOutlined />}
        >
          Hello
        </Button>
        <Button
          type='primary'
          ghost
          // Without html attributes, use `!important` can be acceptable.
          className='text-sm !bg-white'
          icon={<UserAddOutlined />}
        >
          Hello
        </Button>
        <button>hello</button>
      </div>
      <div>
        <Switch />
      </div>
      <div>
        <Input placeholder='hello' prefix={<UserOutlined />} />
      </div>
      <div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
      <div>
        <Image
          width={200}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
      </div>
      <div>
        <Select
          defaultValue='lucy'
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <div>
        <Cascader options={options} placeholder='Please select' />
      </div>
    </div>
  )
}

export default function Antd() {
  return (
    <>
      <h2 className='my-3'>Default mode</h2>
      <Demos />
      <h2 className='my-3'>Dark mode</h2>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Demos dark />
      </ConfigProvider>
    </>
  )
}
