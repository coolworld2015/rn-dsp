'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    NavigatorIOS,
    Alert
} from 'react-native';

import Campaigns from '../campaigns/campaigns';
import Sspsem from '../sspsem/sspsem';
import AllRNComponents from '../components/components';
import Viewoo from '../viewoo/viewoo';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Campaigns'
        };
    }

    onLogOut() {
        this.props.onLogOut();
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

    render() {
        return (
            <TabBarIOS>

                <TabBarIOS.Item
                    title="Campaigns"
                    icon={require('../../../img/campaigns.png')}
                    selected={this.state.selectedTab === 'Campaigns'}
                    onPress={() => this.setState({selectedTab: 'Campaigns'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="campaigns"
                        initialRoute={{
                            component: Campaigns,
                            title: 'Campaigns',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.deleteItemDialog();
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="SSP EM"
                    icon={require('../../../img/sspsem.png')}
                    selected={this.state.selectedTab === 'Sspsem'}
                    onPress={() => this.setState({selectedTab: 'Sspsem'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="sspsem"
                        initialRoute={{
                            component: Sspsem,
                            title: 'SSP Endpoints Manager',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.deleteItemDialog();
                            }
                        }}
                    />
                </TabBarIOS.Item>

{/*                <TabBarIOS.Item
                    title="Demo"
                    icon={require('../../../img/images.png')}
                    selected={this.state.selectedTab === 'Demo'}
                    onPress={() => this.setState({selectedTab: 'Demo'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: AllRNComponents,
                            title: 'Demo',
                        }}
                    />
                </TabBarIOS.Item>*/}

{/*                <TabBarIOS.Item
                    title="Viewoo"
                    icon={require('../../../img/images.png')}
                    selected={this.state.selectedTab === 'Viewoo'}
                    onPress={() => this.setState({selectedTab: 'Viewoo'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Viewoo,
                            title: 'Viewoo',
                        }}
                    />
                </TabBarIOS.Item>*/}

                <TabBarIOS.Item
                    title="Logout"
                    icon={require('../../../img/log-out.png')}
                    selected={this.state.selectedTab === 'Logout'}
                    onPress={this.onLogOut.bind(this)}>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

export default AppContainer;