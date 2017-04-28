'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
	TouchableWithoutFeedback,
    ScrollView,
	ActivityIndicator
} from 'react-native';

class ViewooDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
            name: ''
        };
		
		if (props.data) {
			this.state = {
				name: props.data.title,
				slug: props.data.slug,
				url: 'http://viewoo.tv' + props.data.poster.large_path
			};
			this.getItems();
		}
    }

    getItems() {
        let url = 'http://viewoo.tv/api/movies/' + this.state.slug.toLowerCase();
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
                    description: responseData.description,
                    date: responseData.release_date.split('T')[0]
                });
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
				appConfig.viewoo.refresh = true;
                this.setState({
                    //showProgress: false
                });
            });
    }

    goBack() {
        this.props.navigator.pop();
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
							onPress={() => this.goBack()}>
                            <Text style={styles.textSmall}>
                                Back
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.itemWrap}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.textLarge}>
                                {this.state.name}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
				
                {errorCtrl}

                {loader}
				
                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.itemBlock}>
                            <Image
                                source={{uri: this.state.url}}
                                style={{
                                    height: 300,
                                    width: 200,
                                    borderRadius: 5,
                                    margin: 10
                                }}
                            />
                        </View>

                        <View style={styles.itemBlock}>
							<Text style={styles.itemText}>
								{this.state.date}
							</Text>
                        </View>
                        <View style={styles.itemBlock}>
							<Text style={styles.itemText}>
								{this.state.description}
							</Text>
                        </View>
                    </View>
                </ScrollView>
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
        marginRight: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    itemBlock: {
        flexDirection: 'row',
		justifyContent: 'center',
    },
    itemTextBold: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        marginLeft: 2,
        color: 'black'
    },
	itemWrap: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default ViewooDetails;