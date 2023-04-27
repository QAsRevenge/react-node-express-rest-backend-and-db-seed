module.exports = class Acl {

  // Here you can implement ACL
  // return true = allowed, false = forbidden

  // req.sesssion.user -> logged in user if any

  static checkRoute(req, table, method) {
    // returning true to turn off ACL, remove to implement the ACL below
    return true;
    
    let privilege = req.session.user ?
      (req.session.user.userRole || ' logged in') :
      ' not logged in';
    
        console.log([
      'role: ' + role,
      'url: ' + req.url,
      'table: ' + table,
      'method: ' + method
        ].join('\n'));
    
        // Allows not logged in users to POST to the users table. This implies being able to create an account
    if (privilege === ' not logged in' && table === 'users' && method === 'POST') { return true };
        
    
    // Does not grant users that are not logged in ability to do anything other than GET. Implies only reading data, not posting or modifying
    if (privilege === ' not logged in' && method !== 'GET') { return false };
    
    // Does not allow anyone without admin privilege to access the users table
    if (privilege !== 'admin' && table === 'users') {
      return false;
    }
    
    
  }




}