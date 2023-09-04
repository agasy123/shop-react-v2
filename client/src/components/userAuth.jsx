import React from "react";
import { ClerkProvider, useUser } from "@clerk/clerk-react";

function UserAuth() {
  const {user} = useUser()
	if (user.id==="user_2QYaQaYbzGiV6ZqK6x9qMgaZPI1") {
		return 	[true,"admin"];
	}
	else{
		return 	[false,user.username];
	}
}

export default UserAuth;