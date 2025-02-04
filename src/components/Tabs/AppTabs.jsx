import './AppTabs.css';
import { Component } from 'react';
import { Tabs } from 'antd';

export default class AppTabs extends Component {
  render() {
    const { items } = this.props;
    return (
      <>
        <Tabs defaultActiveKey="1" items={items} centered />
      </>
    );
  }
}
