const getProfile =  (req, res) => { 
    if (!req.user) {
        return res.status(401).json({ error: "L'utilisateur n'est pas authentifié" })
    }
    res.json({ message: "Voici vos informations :", user: req.user })
    }

    export { getProfile }