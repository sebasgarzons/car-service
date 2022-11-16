const logout_links = document.querySelectorAll('.logged_out')
const login_links = document.querySelectorAll('.logged_in')

console.log(logout_links)
console.log(login_links)

export const logincheck = user => {
    if (user){
      login_links.forEach(link => link.style.display = 'block')
      logout_links.forEach(link => link.style.display = 'none')
    }else{
      login_links.forEach(link => link.style.display = 'none')
      logout_links.forEach(link => link.style.display = 'block')
    }
}