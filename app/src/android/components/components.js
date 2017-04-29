'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Alert,
    DatePickerIOS,
    ProgressViewIOS
} from 'react-native';

class AllRNComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Demo',
            date: new Date(),
            progress: 0
        };
    }

    componentDidMount() {
        this.updateProgress();
    }

    updateProgress() {
        let progress = this.state.progress + 0.01;
        this.setState({progress});
        //this.requestAnimationFrame(() => this.updateProgress());
    }

    getProgress(offset) {
        let progress = this.state.progress + offset;
        return Math.sin(progress % Math.PI) % 1;
    }

    deleteItemDialog() {
        Alert.alert(
            'Delete record',
            'Are you sure you want to delete ' + this.state.name + '?',
            [
                {
                    text: 'Cancel', onPress: () => {
                    this.setState({
                        name: 'Canceled'
                    })
                }
                },
                {
                    text: 'OK', onPress: () => {
                    this.setState({
                        name: 'Deleted'
                    })
                }
                },
            ]
        );
    }

    onDateChange = (date) => {
        this.setState({date: date});
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.form}>

                        <ProgressViewIOS style={styles.progressView} progress={0.5}/>
                        <ProgressViewIOS style={styles.progressView} progressTintColor="yellow"
                                         progress={this.getProgress(0.2)}/>
                        <ProgressViewIOS style={styles.progressView} progressTintColor="red"
                                         progress={this.getProgress(0.4)}/>

                        <DatePickerIOS
                            date={this.state.date}
                            mode="datetime"
                            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                            onDateChange={this.onDateChange}
                        />

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                TEXT:
                            </Text>

                            <Text style={styles.itemText}>
                                {this.state.name}
                            </Text>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.deleteItemDialog()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Button
                            </Text>
                        </TouchableHighlight>

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
    progressView: {
        marginTop: 20,
        marginBottom: 10
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
        color: 'black',
        //justifyContent: 'center'
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

export default AllRNComponents;