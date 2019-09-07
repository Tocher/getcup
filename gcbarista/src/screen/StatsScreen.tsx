import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect, UnpackedConnect} from 'src/redux/connect';
import {Button2} from 'src/components/Button2/Button2';
import {logout} from 'src/services/auth/logout';
import {getStats} from 'src/services/stats/getStats';
import {State} from 'src/schema/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 40,
    },
});

interface CupStats {
    title: string;
    created: string;
}

interface Internal {
    stats?: CupStats[];
    refreshing: boolean;
}

function stateToProps(state: State) {
    let stats: CupStats[] = [];
    let payments = state.stats && state.stats.results;
    let products = state.products && state.products.results;

    let paymentsLoading = state.stats && state.stats._loading;
    let productsLoading = state.products && state.products._loading;

    if (payments) {
        payments.forEach((qrcode) => {
            if (qrcode.status === 'success' && products) {
                let product = products.find((product) => product.id === qrcode.productId);

                stats.push({
                    created: qrcode.created,
                    title: product ? product.title : 'Неизвестный продукт',
                });
            }
        });
    }

    return {
        stats: stats.reverse(),
        refreshing: paymentsLoading || productsLoading,
    };
}

class StatsScreenInternal extends React.PureComponent<Internal & UnpackedConnect> {
    componentDidMount(): void {
        this.props.dispatch(getStats({}));
    }

    onLogout() {
        this.props.dispatch(logout({}));
    }

    onRefresh = () => {
        this.props.dispatch(getStats({}));
    };

    render() {
        let {stats, refreshing} = this.props;

        return (
            <View style={styles.container}>
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingBottom: 10,
                }}>Статистика</Text>
                <ScrollView
                    style={{
                        marginBottom: 20,
                    }}
                    contentContainerStyle={{
                        paddingRight: 5,
                    }}
                    bounces={false}
                    overScrollMode={'never'}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    {stats && stats.length > 0 && stats.map((stat: CupStats, i) => {
                        let date = new Date(stat.created);

                        return (
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingBottom: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#333',
                                    marginTop: 5,
                                }}
                                key={i}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                }}>
                                    {stat.title}
                                </Text>
                                <View style={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 12,
                                    }}>
                                        {date.toLocaleTimeString()}
                                    </Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 12,
                                    }}>
                                        {date.toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                <Button2
                    text='Выйти'
                    onClick={this.onLogout.bind(this)}
                />
            </View>
        );
    }
}

export const StatsScreen = connect(stateToProps)(StatsScreenInternal);
