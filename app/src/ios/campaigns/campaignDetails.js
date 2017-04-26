'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView
} from 'react-native';

class CampaignDetails extends Component {
    constructor(props) {
        super(props);

        let d = new Date(props.pushEvent.updated);

        this.state = {
            id: props.pushEvent.id,
            name: props.pushEvent.name,
            updated: d.toLocaleString(),
            status: props.pushEvent.status.name,
            winRate: props.pushEvent.winRate,
            spend: props.pushEvent.spend,
            impressions: props.pushEvent.impressions,
            creatives: props.pushEvent.creatives
        };
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
                            <Text style={styles.itemTextBold}>
                                Name:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Status:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Updated:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.updated}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                WinRate:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.winRate}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Spend:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.spend}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Impressions:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.impressions}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Creatives:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.creatives}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                ID:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.id}
                                </Text>
                            </View>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Back
                            </Text>
                        </TouchableHighlight>

                        <Text>{this.state.bugANDROID}</Text>
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
        flexDirection: 'row'
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

export default CampaignDetails;