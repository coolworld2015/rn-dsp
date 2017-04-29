'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';

import ViewooDetails from './viewooDetails';

class Viewoo extends Component {
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
            positionY: 0
        };
    }

    componentDidMount() {
        this.getItems();
    }
	
    getItems() {
		this.setState({
            resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        });
				
        let url = 'http://viewoo.tv/api/movies/list/350/0?q=';
        fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.results.slice(0, 15)),
                    resultsCount: responseData.results.length,
                    responseData: responseData.results,
                    filteredItems: responseData.results
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

    showDetails(rowData) {
		this.setState({
			//showProgress: true
		});

        this.props.navigator.push({
            index: 1,
            data: rowData
        });
    }

    renderRow(rowData) {
		let url, image;

			url = 'http://viewoo.tv' + rowData.poster.middle_path;
			image = <Image
				source={{uri: url}}
				style={{
					height: 100,
					width: 70,
					borderRadius: 5,
					margin: 10,
					marginTop: -5,
					marginBottom: -5,
				}}
			/>;

        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.row}>
                    {image}
                    <View style={styles.itemWrap}>
                        <Text style={{backgroundColor: '#fff', fontWeight: 'bold', color: 'black'}}>
                            {rowData.title}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
		//console.log(event.nativeEvent.contentOffset.y)
        if (this.state.showProgress === true) {
            return;
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            console.log(items.length);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.title.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
    refreshDataAndroid() {
        this.setState({
            showProgress: true,
            resultsCount: 0
        });

        this.getItems();
    }
	
    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 25)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 25,
            searchQuery: ''
        });
    }

    render() {
        let errorCtrl, loader;

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

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => this.refreshDataAndroid()}
                            underlayColor='#ddd'
                        >
                            <Text style={styles.textSmall}>
                                Reload
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            underlayColor='#ddd'
                            onPress={() => this.clearSearchQuery()}
                        >
                            <Text style={styles.textLarge}>
                                Viewoo
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => this.goSearch()}
                            underlayColor='#ddd'
                        >
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={this.onChangeText.bind(this)}
                        style={styles.textInput}
                        value={this.state.searchQuery}
                        placeholder="Search here">
                    </TextInput>
                </View>

                {errorCtrl}

                {loader}

                <ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View>
                    <Text style={styles.countFooter}>
                        Records: {this.state.resultsCount}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#48BBEC',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginRight: 60,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
	itemWrap: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
        color: 'white',
        fontWeight: 'bold'
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

export default Viewoo;