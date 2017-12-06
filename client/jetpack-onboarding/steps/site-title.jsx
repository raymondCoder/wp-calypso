/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import FormattedHeader from 'components/formatted-header';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';
import FormTextarea from 'components/forms/form-textarea';
import Main from 'components/main';
import QuerySiteSettings from 'components/data/query-site-settings';
import { saveSiteSettings } from 'state/site-settings/actions';
import { getSiteSettings } from 'state/site-settings/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';

class JetpackOnboardingSiteTitleStep extends React.PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			description: props.siteSettings.blogname,
			title: props.siteSettings.blogdescription,
		};
	}

	setDescription = event => {
		this.setState( { description: event.target.value } );
	};

	setTitle = event => {
		this.setState( { title: event.target.value } );
	};

	render() {
		const { siteId, translate } = this.props;
		const headerText = translate( "Let's get started." );
		const subHeaderText = translate(
			'First up, what would you like to name your site and have as its public description?'
		);

		return (
			<Main>
				<QuerySiteSettings siteId={ siteId } />
				<FormattedHeader headerText={ headerText } subHeaderText={ subHeaderText } />

				<Card>
					<form>
						<FormFieldset>
							<FormLabel htmlFor="title">{ translate( 'Site Title' ) }</FormLabel>
							<FormTextInput id="title" onChange={ this.setTitle } value={ this.state.title } />
						</FormFieldset>

						<FormFieldset>
							<FormLabel htmlFor="description">{ translate( 'Site Description' ) }</FormLabel>
							<FormTextarea
								id="description"
								onChange={ this.setDescription }
								value={ this.state.description }
							/>
						</FormFieldset>

						<Button href={ this.props.getForwardUrl() } primary>
							{ translate( 'Next Step' ) }
						</Button>
					</form>
				</Card>
			</Main>
		);
	}
}

export default connect(
	state => {
		const siteId = getSelectedSiteId( state );

		return {
			siteId,
			siteSettings: getSiteSettings( state, siteId ),
		};
	},
	{ saveSiteSettings }
)( localize( JetpackOnboardingSiteTitleStep ) );
