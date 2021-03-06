'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
    Dimensions,
    Alert
} from 'react-native';

import CampaignDetails from './campaignDetails';

class Campaigns extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.setState({
            width: Dimensions.get('window').width
        });
        this.getItems();
    }

    getItems() {
        let url = 'http://dsp1.epomstaging.com/demand/management/campaigns/list';
        fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 15)),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData
                });
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    deleteItemDialog() {
        Alert.alert(
            'Information.',
            'This action is under construction.',
            [
                {
                    text: 'OK', onPress: () => {}
                },
            ]
        );
    }

    showDetails(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: CampaignDetails,
            rightButtonTitle: 'Delete',
            onRightButtonPress: () => {
                this.deleteItemDialog();
            },
            passProps: {
                data: rowData
            }
        });
    }

    renderRow(rowData) {
        let d = new Date(rowData.updated);
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.row}>
                    <View style={styles.textBlock}>
                        <Text style={styles.textItemBold}>
                            {rowData.name}
                        </Text>
                        <Text style={styles.textItemBold}>
                            {rowData.status.name}
                        </Text>

                        <Text style={styles.textItem}>
                            Updated: {d.toLocaleString()}
                        </Text>
                        <Text style={styles.textItem}>
                            Impressions: {rowData.impressions.toString()}
                        </Text>
                        <Text style={styles.textItem}>
                            Win rate: {rowData.winRate.toString()}
                        </Text>
                        <Text style={styles.textItem}>
                            Spend: {rowData.spend.toString()}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 15,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.getItems()
            }, 300);
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            console.log(items.length);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 15,
            searchQuery: ''
        });
    }

    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    animating={true}
                />
            </View>;
        }

        if (this.state.searchQuery.length > 0) {
            image = <Image
                source={require('../../../img/cancel.png')}
                style={{
                    height: 20,
                    width: 20,
                    marginTop: 10
                }}
            />;
        }

        return (
            <View style={styles.container}>
                <View style={styles.iconForm}>
                    <View>
                        <TextInput
                            onChangeText={this.onChangeText.bind(this)}
                            style={{
                                height: 45,
                                padding: 5,
                                backgroundColor: 'white',
                                borderWidth: 3,
                                borderColor: 'white',
                                borderRadius: 0,
                                width: this.state.width * .90,
                            }}
                            value={this.state.searchQuery}
                            placeholder="Search here">
                        </TextInput>
                    </View>
                    <View style={{
                        height: 45,
                        backgroundColor: 'white',
                        borderWidth: 3,
                        borderColor: 'white',
                        marginLeft: -5,
                        paddingLeft: 5,
                        width: this.state.width * .10,
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.clearSearchQuery()}
                        >
                            <View>
                                {image}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {errorCtrl}

                {loader}

                <ScrollView
                    onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                    <ListView
                        style={styles.scroll}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View>
                    <TouchableWithoutFeedback
                        onPress={() => this.clearSearchQuery()}>
                        <Text style={styles.countFooter}>
                            Records: {this.state.resultsCount}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 64
    },
    iconForm: {
        flexDirection: 'row',
        borderColor: 'lightgray',
        borderWidth: 3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#48BBEC',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    search: {
        marginTop: 60
    },
    textInput: {
        height: 45,
        marginTop: 4,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0,
    },
    textItemBold: {
        fontWeight: 'bold',
        color: 'black'
    },
    textItem: {
        color: 'black'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        paddingLeft: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    scroll: {
        marginTop: -65,
        marginBottom: -45
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke',
        fontWeight: 'bold',
        marginBottom: 49
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Campaigns;