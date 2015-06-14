<?php

// The script which logs a user out and destroys any data stored in the current session.

include "base.php"; $_SESSION = array(); session_destroy(); ?>