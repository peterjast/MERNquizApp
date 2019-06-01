import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteUserAccount } from '../../actions';
import { MODERATOR_LEVEL } from '../../constants/accessLevel';

class DashboardHeader extends Component {
  EditProfileButton = (
    <Link
      style={{ color: 'white' }}
      className="is-small"
      to="/dashboard/edit-profile"
    >
      <i className="fas fa-pencil-alt" />
    </Link>
  );

  DeleteProfileButton = (
    <a
      style={{ color: 'white' }}
      className="is-small"
      onClick={this.toggleModal}
    >
      <i className="fas fa-trash-alt" />
    </a>
  );

  toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  renderModal = (
    <div className="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Account</p>
        </header>
        <section className="modal-card-body">
          <div style={{ color: 'black' }}>
            Clicking on the Delete Account button will delete your profile and
            all the stats associated with it. This action cannot be reversed.
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={this.toggleModal}>
            Cancel
          </button>
          <button
            className="button is-danger"
            onClick={() => this.props.deleteUserAccount(this.props.history)}
          >
            Delete Account
          </button>
        </footer>
      </div>
    </div>
  );

  render() {
    const { user } = this.props;
    return (
      <div
        className="card"
        style={{
          width: '100%',
          backgroundColor: '#1EC9AC',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <div className="card-content">
          <h1 className="is-size-2">Welcome, {user.name}</h1>
            <h1 className="is-size-5">{user.email} _     

            {user.studentNumber ? (
              <span> {user.studentNumber} {this.EditProfileButton}{' '}
                {this.DeleteProfileButton}
              </span>
            ) : (
              <span>{this.EditProfileButton}{' '}
                {this.DeleteProfileButton}
              </span>
            )}
          </h1>     
          <br></br>
          {/* Show New Question button only when user has access greater than 2 */}
          {user.accessLevel >= MODERATOR_LEVEL ? (
            <Link className="button is-white is-outlined" to="/question/new">
              Create New Quiz
            </Link>
          ) : (
            ''
          )}
          <br></br><br></br>
          {user.accessLevel >= MODERATOR_LEVEL ? (
            <Link className="button is-white is-outlined" to="/admin/quizzes">
              Manage Activities
            </Link>
          ) : (
            ''
          )}
          <br></br><br></br>
          {user.accessLevel >= MODERATOR_LEVEL ? (
            <Link className="button is-white is-outlined" to="/admin/quizzes">
              View Students
            </Link>
          ) : (
            ''
          )}   
          <br></br><br></br>                 
        </div>
        {this.renderModal}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteUserAccount }
)(withRouter(DashboardHeader));
