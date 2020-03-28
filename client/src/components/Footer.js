import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            2020 &copy; E-Collab. All Rights Reserved. Crafted with <i className='uil uil-heart text-danger font-size-12'></i> by 
                                <a href="#" target="_blank" rel="noopener noreferrer" className="ml-1">Hashtag</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;