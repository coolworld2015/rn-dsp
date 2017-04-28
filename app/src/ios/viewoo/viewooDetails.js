'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView
} from 'react-native';

class ViewooDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.data.title,
            slug: props.data.slug,
            url: 'http://viewoo.tv' + props.data.poster.large_path
        };
        //this.getItems();
    }

    componentDidMount() {
        //this.getItems();
    }

    getItems() {
        let url = 'http://viewoo.tv/api/movies/' + this.state.slug.toLowerCase();
        console.log(url)
        //let url = 'http://dsp1.epomstaging.com/demand/management/campaigns/list';
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
                    description: responseData.description
                });
            })
            .catch((error) => {
                console.log(error)
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
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.form}>


                        <View style={styles.itemBlock}>
                            <Image
                                source={{uri: this.state.url}}
                                style={{
                                    height: 500,
                                    width: 300,
                                    borderRadius: 5,
                                    margin: 10
                                }}
                            />
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
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    itemBlock: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    itemTextBold: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        marginLeft: 2,
        color: 'black'
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
    }
});

export default ViewooDetails;