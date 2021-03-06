// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component, PropTypes } from 'react';

import { CheckIcon, StarIcon, StarOutlineIcon } from '~/ui/Icons';
import SectionList from '~/ui/SectionList';
import { arrayOrObjectProptype } from '~/util/proptypes';

import styles from './selectionList.css';

export default class SelectionList extends Component {
  static propTypes = {
    isChecked: PropTypes.func,
    items: arrayOrObjectProptype().isRequired,
    noStretch: PropTypes.bool,
    onDefaultClick: PropTypes.func,
    onSelectClick: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  render () {
    const { items, noStretch } = this.props;

    return (
      <SectionList
        items={ items }
        noStretch={ noStretch }
        renderItem={ this.renderItem }
      />
    );
  }

  renderItem = (item, index) => {
    const { isChecked, onDefaultClick, onSelectClick, renderItem } = this.props;
    const isSelected = isChecked
      ? isChecked(item)
      : item.checked;

    const makeDefault = () => {
      onDefaultClick(item);
      return false;
    };
    const selectItem = () => {
      onSelectClick(item);
      return false;
    };

    let defaultIcon = null;

    if (onDefaultClick) {
      defaultIcon = isSelected && item.default
        ? <StarIcon />
        : <StarOutlineIcon className={ styles.iconDisabled } onClick={ makeDefault } />;
    }

    const classes = isSelected
      ? [styles.item, styles.selected]
      : [styles.item, styles.unselected];

    return (
      <div className={ classes.join(' ') }>
        <div
          className={ styles.content }
          onClick={ selectItem }
        >
          { renderItem(item, index) }
        </div>
        <div className={ styles.overlay }>
          { defaultIcon }
          {
            isSelected
              ? <CheckIcon onClick={ selectItem } />
              : <CheckIcon className={ styles.iconDisabled } onClick={ selectItem } />
          }
        </div>
      </div>
    );
  }
}
