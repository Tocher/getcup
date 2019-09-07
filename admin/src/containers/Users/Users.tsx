import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {State, UserSchema} from 'schema/State/State';
import {Spin, Col, Row, Empty} from 'antd';
import {getCollectionResults} from 'helpers/common/getCollectionResults/getCollectionResults';
import {fetchUsers} from 'services/user/fetchUsers';
import {isCollectionLoading} from 'helpers/common/isCollectionLoading/isCollectionLoading';
import {UserCard} from 'componets/UserCard/UserCard';

export interface UsersProps {

}

interface Internal {
    users?: UserSchema[];
    isLoading: boolean;
}

interface ComponentState {

}

function stateToProps(state: State, props: UsersProps): Internal {
    let users = getCollectionResults<UserSchema>(state, 'users');
    let isLoading = isCollectionLoading(state, 'users');

    return {
        users,
        isLoading,
    };
}

class UsersInternal extends React.Component<UsersProps & Internal & UnpackedConnect, ComponentState> {
    componentDidMount(): void {
        let {users, isLoading, dispatch} = this.props;

        if ((!users || !users.length) && !isLoading) {
            dispatch(fetchUsers({}));
        }
    }

    renderUsers() {
        const chunk = 4;

        let {users} = this.props;

        if (!users) {
            return null;
        }

        let rows: Array<UserSchema[]> = [];

        for (let i = 0; i < users.length; i += chunk) {
            rows.push(users.slice(i, i + chunk));
        }

        return rows.map((row, index) => {

            let usersInRow = row.map((user, index) => {
                return (
                    <Col
                        key={index}
                        span={6}
                    >
                        <UserCard user={user} />
                    </Col>
                )
            });

            return (
                <Row gutter={16} key={index}>
                    {usersInRow}
                </Row>
            );
        });
    }

    render() {
        let {users, isLoading} = this.props;

        return isLoading ? (
            <Spin />
        ) : (users && users.length) ?
            this.renderUsers()
        : (
            <Empty />
        );
    }

}

export const Users = connect<UsersProps, Internal>(stateToProps)(UsersInternal);
