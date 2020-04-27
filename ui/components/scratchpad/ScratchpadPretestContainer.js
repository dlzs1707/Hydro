import React from 'react';
import { connect } from 'react-redux';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import i18n from 'vj/utils/i18n';
import Icon from 'vj/components/react/IconComponent';
import Panel from './PanelComponent';
import PanelButton from './PanelButtonComponent';
import ScratchpadPretestTabPane from './ScratchpadPretestTabPaneContainer';

const mapStateToProps = (state) => ({
  current: state.pretest.current,
  tabs: state.pretest.tabs,
  meta: state.pretest.meta,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickClose() {
    dispatch({
      type: 'SCRATCHPAD_UI_SET_VISIBILITY',
      payload: {
        uiElement: 'pretest',
        visibility: false,
      },
    });
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ScratchpadPretestContainer extends React.PureComponent {
  render() {
    return (
      <Panel
        title={(
          <span>
            <Icon name="edit" />
            {' '}
            {i18n('Pretest')}
          </span>
        )}
      >
        <Tabs
          className="scratchpad__panel-tab flex-col flex-fill"
          activeKey={this.props.current}
          onChange={(tabId) => this.props.handleSwitchData(tabId)}
          animation="slide-horizontal"
          renderTabBar={() => (
            <ScrollableInkTabBar
              extraContent={(
                <span>
                  <PanelButton
                    onClick={() => this.props.handleClickClose()}
                  >
                    <Icon name="close" />
                  </PanelButton>
                </span>
              )}
            />
          )}
          renderTabContent={() => <TabContent />}
        >
          {this.props.tabs.map((tabId) => (
            <TabPane tab={this.props.meta[tabId].title} key={tabId}>
              <ScratchpadPretestTabPane id={tabId} />
            </TabPane>
          ))}
        </Tabs>
      </Panel>
    );
  }
}
