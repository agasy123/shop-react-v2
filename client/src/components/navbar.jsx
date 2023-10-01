import React from 'react';
import {Link} from 'react-router-dom';
import UserAuth from './userAuth';
import {
	ClerkProvider,
	SignedIn,
	SignInButton,
	SignedOut,
	SignOut,
	UserButton,
	useUser,
	RedirectToSignIn,
	SignOutButton,
	UserProfile,
	useSession,
	useClerk,
  } from "@clerk/clerk-react";

function User() {
	if (UserAuth()[0]) {	
		return <li><li>Welcome admin, you can do whatever you want</li><li><SignedIn><Link to="/admin">Admin Panel</Link></SignedIn></li></li>
	}else {
		return <li>Welcome {UserAuth()[1]}</li>
	}
}


function NavBar() {
    return(
        <header>
		    <nav>
                <h1 id='logo-text'>Aghasi Harutyunyan</h1>
			    <ul className='menu'>
				    <li><Link to="/">Home</Link></li>
				    <li><Link to="/products">Products</Link></li>
				    <li><Link to="/contact" >Contact</Link></li>
					<li><Link to="/cart">Cart</Link></li>
				    <li><SignedOut><SignInButton /> </SignedOut><SignedIn><UserButton showName={true}/><SignOutButton /></SignedIn></li>
					<li><SignedIn><User /></SignedIn></li>
					<li></li>
			    </ul>
		    </nav>
	    </header>
    )
}

export default NavBar;