'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';

import Campaigns from '../campaigns/campaigns';
import Sspsem from '../sspsem/sspsem';

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
                            title: 'Campaigns'
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
                        }}
                    />
                </TabBarIOS.Item>

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