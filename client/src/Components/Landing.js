import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  renderNavLinks() {
    if (this.props.user === false) {
      return (
        <span className="navbar-item">
          <a className="button is-white is-outlined" href="/auth/google">
            <span className="icon">
              <i className="fab fa-google" />
            </span>
            <span>Sign In With Google</span>
          </a>
        </span>
      );
    }
  }

  renderButton() {
    switch (this.props.user) {
    case null:
      return;
    case false:
      return (
        <a className="button is-white is-outlined" href="/auth/google">
          <span className="icon">
            <i className="fab fa-google" />
          </span>
          <span>Get Started</span>
        </a>
      );

    default:
      return (
        <a className="button is-white is-outlined" href="/dashboard">
          <span>Go to Dashboard</span>
          <span className="icon">
            <i className="fas fa-arrow-right" />
          </span>
        </a>
      );
    }
  }
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-head">
          <nav className="navbar is-dark">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item" href="../">
                  <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    A+ Quizzes
                  </span>
                </a>
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu is-dark">
                <div className="navbar-end">{this.renderNavLinks()}</div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">Building a better tomorrow one quiz at a time.</h1>
              <h2 className="subtitle">Our digital classrooms and online assessments provide an innovative platform for teachers and students to thrive in a technology-driven tomorrow.
              </h2>
              {this.renderButton()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(Landing);
