import React from 'react';

const authenticatedRoute = ( Component ) => {

    class AuthenticatedRoute extends React.Component {

        state = {
            loading: true,
        };

        componentDidMount() {
            if ( localStorage.getItem( 'auth' ) === 'true' ) {
                this.setState({ loading: false });
            } else {
                window.location.replace('/login');
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

    return AuthenticatedRoute;
};

export default authenticatedRoute;