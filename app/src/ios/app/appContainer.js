'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';

import Campaigns from '../campaigns/campaigns';
import Audit from '../audit/audit';

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
                        ref="phones"
                        initialRoute={{
                            component: Campaigns,
                            title: 'Campaigns'
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="SSP EM"
                    icon={require('../../../img/sspsem.png')}
                    selected={this.state.selectedTab === 'Audit'}
                    onPress={() => this.setState({selectedTab: 'Audit'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="audit"
                        initialRoute={{
                            component: Audit,
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