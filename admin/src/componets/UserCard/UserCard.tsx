import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {Avatar, Card, Icon, Descriptions} from 'antd';
import {State, UserSchema} from 'schema/State/State';
import {getUserSubscriptions} from 'services/subscriptions/getUserSubscriptions';

export interface UserCardProps {
    user: UserSchema;
}

interface Internal {

}

interface ComponentState {

}

function stateToProps(state: State, props: UserCardProps): Internal {

    return {};
}

class UserCardInternal extends React.Component<UserCardProps & UnpackedConnect & Internal, ComponentState> {
    componentDidMount(): void {
        let {dispatch, user} = this.props;

        dispatch(getUserSubscriptions({
            userId: user.id,
        }))
    }

    render() {
        let {user} = this.props;

        return (
            <Card
                actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="edit" key="edit" />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={user.name || 'undefined'}
                    description={user.email}
                />
                <Descriptions layout="horizontal" column={1} style={{paddingTop: 15}}>
                    <Descriptions.Item label="Чашки">Zhou Maomao</Descriptions.Item>
                </Descriptions>
            </Card>
        );
    }

}

export const UserCard = connect<UserCardProps & Internal>(stateToProps)(UserCardInternal);
