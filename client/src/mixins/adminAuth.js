import axios from "axios"

export default{
    created(){
        const token = localStorage.getItem("token")
        if(!token){
            this.$router.push('/')
        }
        else{
            const username = localStorage.getItem("username")
            axios.get(`http://localhost:3000/login/userType/${username}`)
            .then(response => {
                if(response.data !== 'admin'){
                    this.$router.push({name: 'unauthorisedUser'})
                }
            })
        }
    }
}