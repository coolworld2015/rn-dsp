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
	ActivityIndicator,
	BackAndroid
} from 'react-native';

class ViewooDetails extends Component {
    constructor(props) {
        super(props);
		
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });	
		
		this.state = {
            name: '',
			showProgress: true
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
				console.log(responseData)
				let genres, cast, crew;
					genres = '';
					cast = '';
					crew = '';
					
				if (responseData.genres[0]) {
					genres = genres + responseData.genres[0].title;
				}					
				if (responseData.genres[1]) {
					genres = genres + ', ' + responseData.genres[1].title;
				}					
				if (responseData.genres[2]) {
					genres = genres + ', ' + responseData.genres[2].title;
				}
				
				if (responseData.cast[0]) {
					cast = cast + responseData.cast[0].person.name;
				}					
				if (responseData.cast[1]) {
					cast = cast + ', ' + responseData.cast[1].person.name;
				}					
				if (responseData.cast[2]) {
					cast = cast + ', ' + responseData.cast[2].person.name;
				}					
				
				if (responseData.crew[0]) {
					crew = crew + responseData.crew[0].name;
				}					
				if (responseData.crew[1]) {
					crew = crew + ', ' + responseData.crew[1].name;
				}					
				if (responseData.crew[2]) {
					crew = crew + ', ' + responseData.crew[2].name;
				}
						
                this.setState({
                    description: responseData.description,
                    date: responseData.release_date.split('T')[0],
                    year: responseData.year,

					genres: genres,
					cast: cast,
					crew: crew
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
							<View>
								<Text style={styles.textSmall}>
									Back
								</Text>
							</View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.itemWrap}>
                        <TouchableWithoutFeedback>
							<View>
								<Text style={styles.textLarge}>
									{this.state.name}
								</Text>
							</View>	
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
							<View>
								<Text style={styles.textSmall}>
								</Text>
							</View>	
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
							<Text style={styles.itemTextBolder}>
								{this.state.year}
							</Text>
                        </View>
						
                        <View style={styles.itemBlock}>
							<Text style={styles.itemTextBolder}>
								{this.state.genres}
							</Text>
                        </View>
						
                        <View style={styles.itemBlock}>
							<Text style={styles.itemTextBolder}>
								{this.state.crew}
							</Text>
                        </View>			
						
                        <View style={styles.itemBlock}>
							<Text style={styles.itemTextBolder}>
								{this.state.cast}
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
    itemTextBolder: {
        fontSize: 14,
        textAlign: 'center',
        margin: 5,
        marginLeft: 2,
		fontWeight: 'bold',
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