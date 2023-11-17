import React, { useState, useEffect } from 'react';

const GithubUserSearch = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        if (!username) return;
            setLoading(true);
            setError(null);
            
            //--------- set url and accesstoken ----------
            const url = `https://api.github.com/users/${username}`;
            const accessToken = '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';
            //--------- set url and accesstoken ----------

            //------------ create headers & options -----------
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`);
            headers.append('X-GitHub-Api-Version', '2022-11-28');

            const options = {
                method: 'GET',
                headers: headers,
            };
            //------------ create headers & options -----------

            //---------- fatch data ----------
            await fetch(url, options).then((res) => {
                res.json().then((result) => {
                    setUserData(result);

                    //----------if user not found-----------
                    if (result.message == "Not Found") {
                        setError('User not found');
                        setUserData(null)
                    }
                    //----------if user not found-----------
                    // console.log(result);
                })
            }).catch((err) => {
                console.error("ERROR:" + err);
            }).finally(() => {
                setLoading(false);
                setError(null)
            })
            //---------- fatch data ----------
        };

        useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <div className='dflex'>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={()=>{fetchUserData()}} className='searchbtn'>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {/* Error: */}
            {error && <p>{error}</p>}

            {userData && (
                <div>
                    <h2>{userData.login}</h2>
                    <img style={{ width: "80px" }} src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repositories: {userData.public_repos}</p>
                </div>
            )}
        </div>
    );
};

export default GithubUserSearch;
