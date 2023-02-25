import React from 'react';

const authenticatedWidth = ( Component ) => {

    class AuthenticatedWidth extends React.Component {

        state = {
            loading: true,
        };

        componentDidMount() {

            if( window.screen.width > 600 ) {
                window.location.replace('/errorWidth');
            } else {
                this.setState({ loading: false });
            }

        }

        render() {
            const { loading } = this.state;

            if ( loading ) {
                return <div />;
            }

            return <Component {...this.props} />;
        }
    }

    return AuthenticatedWidth;
};

export default authenticatedWidth;