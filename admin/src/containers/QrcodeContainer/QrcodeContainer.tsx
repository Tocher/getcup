import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {State} from 'schema/State/State';
import * as QRCode from 'qrcode.react';
import {getStaticQrcode} from 'services/qrcode/getStaticQrcode';
import {Avatar, Card, Col, Row} from 'antd';

export interface QrcodeProps {

}

interface Internal {
    hash?: string;
}


function stateToProps(state: State, props: QrcodeProps): Internal {
    return {
        hash: state.qrcode,
    };
}

const QR_STUBS = [
    {
        hash: '11111111',
        title: 'Успешное капучино',
        where: 'с собой',
    },
    {
        hash: '11111112',
        title: 'Успешное капучино',
        where: 'на месте',
    },
    {
        hash: '11111113',
        title: 'Ошибка',
    }
];

class QrcodeInternal extends React.Component<QrcodeProps & Internal & UnpackedConnect> {
    componentDidMount(): void {
        // let {dispatch} = this.props;
        //
        // dispatch(getStaticQrcode({}));
    }

    render() {
        // let {hash} = this.props;
        //
        // if (!hash) {
        //     return null;
        // }

        return (
            <Row gutter={16}>
                {QR_STUBS.map((qr, index) => {
                    return (
                        <Col
                            key={index}
                            span={6}
                        >
                            <Card>
                                <QRCode value={qr.hash} />
                                <Card.Meta
                                    title={qr.title}
                                    description={qr.where}
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }

}

export const QrcodeContainer = connect<QrcodeProps, Internal>(stateToProps)(QrcodeInternal);
