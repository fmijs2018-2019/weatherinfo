import * as React from 'react';
import NavigationBar from './components/NavigationBar';

interface ILayoutProps {
}

export class Layout extends React.Component<ILayoutProps> {

    render() {
        return <React.Fragment>
			<NavigationBar></NavigationBar>
            <main>
                {this.props.children}
            </main>
        </React.Fragment>;
    }
}
