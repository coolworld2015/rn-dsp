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
	Alert,
	Image,
	Dimensions,
	RefreshControl
} from 'react-native';

class Campaigns extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
			searchQuery: '',
			refreshing: false
        };
    }

    componentDidMount() {
		this.setState({
            width: Dimensions.get('window').width
        });
        this.getItems();
    }

    getItems() {
		this.setState({
			serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
			searchQuery: ''
        });
		
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
                    filteredItems: responseData,
					refreshing: false
                });
            })
            .catch((error) => {
                this.setState({
                    serverError: true,
					dataSource: this.state.dataSource.cloneWithRows([]),
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

    showDetails(rowData) {
        this.props.navigator.push({
            index: 1,
            data: rowData
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

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
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
        let items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
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
				<View style={styles.header}>
					<View>
						<TouchableWithoutFeedback>
							<View>
								<Text style={styles.textSmall}>
								</Text>
							</View>	
						</TouchableWithoutFeedback>
					</View>
					<View>
						<TouchableWithoutFeedback>
							<View>
								<Text style={styles.textLarge}>
									Campaigns
								</Text>
							</View>	
						</TouchableWithoutFeedback>
					</View>
					<View>
						<TouchableWithoutFeedback
							onPress={() => this.deleteItemDialog()}
						>
							<View>
								<Text style={styles.textSmall}>
									New
								</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>

				<View style={styles.iconForm}>
					<View>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
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
						marginLeft: -10,
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

				<ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
					refreshControl={
						<RefreshControl
							enabled={true}
							refreshing={this.state.refreshing}
							onRefresh={this.refreshDataAndroid.bind(this)}
						/>
					}
				>
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
        paddingLeft: 20,
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

export default Campaigns;