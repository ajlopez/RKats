
const app = (function () {
    const state = {
    };
    
    const config = {
        host: 'https://public-node.testnet.rsk.co:443',

        accounts: {
            alice: '0x4115d23b044e2d5a713329b8cf35520cf7ae8421'
        },
        
        instances: {
            rkat: '0x128d94b7e7720bfef980533fa1897baf06018dd4'
        },
        
        api: 'https://rskapis.vercel.app/api/testnet/users/'
    };
        
    async function start() {
        const canvas = document.getElementById('homecanvas');

        const url = config.host;
        const sender = config.accounts.alice;
        const contract = config.instances.rkat;
        
        const client = rskapi.client(url);
        
        try {
            const data = await client.call(sender, contract, "rkats(uint256)", [ 42 ]);            
            const id = data.substring(0, 12);
            
            generateMoonCatImage(id, 16, canvas);            
        }
        catch(err) {
            alert(err);
        }
    }
    
    let currentPage = 'home';
    
    function goTo(newPage) {
        const newSection = document.getElementById('section_' + newPage);
        
        if (!newSection)
            return;
        
        const oldSection = document.getElementById('section_' + currentPage);
            
        oldSection.style.display = 'none';
        newSection.style.display = 'block';
        
        currentPage = newPage;
    }
    
    function generateMoonCatImage(catId, size, canvas){
      size = size || 10;
      
      const data = mooncatparser(catId);
      
      canvas.width = size * data.length;
      canvas.height = size * data[1].length;
      
      const ctx = canvas.getContext("2d");

      for (let i = 0; i < data.length; i++){
        for (let j = 0; j < data[i].length; j++){
          const color = data[i][j];
          
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(i * size, j * size, size, size);
          }
        }
      }
      
      return canvas.toDataURL();
    }
    
    function signIn(username, password, cb) {
        const data = {
            username: username,
            password: password
        };
        
		const body = JSON.stringify(data);
        
        const url = config.api + 'login';

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },        
            body: body
        })
        .then(response => { console.log(response); return response.json() })
        .then(data => { 
            // TODO check data.error
            state.user = data;
            
            hide('button_signin');
            hide('button_signup');
            show('button_signout');
            
            cb(null, null);
        })
        .catch(err => cb(err, null));    
    }
    
    function signOut() {
        hide('button_signout');
        show('button_signin');
        show('button_signup');
        
        goTo('home');
    }
    
    function show(id) {
        const element = document.getElementById(id);
        
        element.style.display='block';
    }
    
    function hide(id) {
        const element = document.getElementById(id);
        
        element.style.display='none';
    }

    return {
        start,
        goTo,
        signIn,
        signOut
    }
})();

