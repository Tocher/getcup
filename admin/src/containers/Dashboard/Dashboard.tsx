import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {State} from 'schema/State/State';
import {Route, withRouter, NavLink, RouteComponentProps} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

import './Dashboard.css';
import {Users} from 'containers/Users/Users';
import {QrcodeContainer} from 'containers/QrcodeContainer/QrcodeContainer';

const {Header, Content, Footer, Sider} = Layout;

const MENU_CONFIG = [
    {
        label: 'Главная',
        icon: 'pie-chart',
        link: '/dashboard'
    },
    {
        label: 'Кофейни',
        icon: 'home',
        link: '/dashboard/places'
    },
    {
        label: 'Пользователи',
        icon: 'team',
        link: '/dashboard/users'
    },
    {
        label: 'Подписки',
        icon: 'coffee',
        link: '/dashboard/subscriptions'
    },
    {
        label: 'Транзакции',
        icon: 'transaction',
        link: '/dashboard/subscriptions'
    },
    {
        label: 'Вечный QR',
        icon: 'qrcode',
        link: '/dashboard/qr'
    },
];

export interface DashboardProps extends RouteComponentProps{

}

interface Internal {
    selectedMenu: string[];
}

interface ComponentState {
    collapsed: boolean;
}

function stateToProps(state: State, props: DashboardProps): Internal {
    let selectedMenu = MENU_CONFIG.findIndex((item) => {
        return item.link === props.location.pathname;
    });

    return {
        selectedMenu: [String(selectedMenu)] || [],
    };
}

class DashboardInternal extends React.Component<DashboardProps & Internal & UnpackedConnect, ComponentState> {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: boolean) => {
        this.setState({collapsed});
    };

    render() {
        let {selectedMenu} = this.props;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light">
                    <div className="logo">GetCup</div>
                    <Menu mode="inline" selectedKeys={selectedMenu}>
                        {MENU_CONFIG.map((item, index) => {
                            return (
                                <Menu.Item key={index}>
                                    <NavLink to={item.link} activeClassName="active">
                                        <Icon type={item.icon}/>
                                        <span>{item.label}</span>
                                    </NavLink>
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>

                        <Route path="/dashboard/users" component={Users} />
                        <Route path="/dashboard/qr" component={QrcodeContainer} />
                    </Content>
                    <Footer style={{textAlign: 'center'}}>GetCup ©2019</Footer>
                </Layout>
            </Layout>
        );
    }

}

export const Dashboard = withRouter<any, any>(connect<DashboardProps, Internal>(stateToProps)(DashboardInternal));
