const mysql= require('mysql2')
const config = require('./config')
module.exports={
    query(q,callback){
        query(q, function(res){
            return callback(res);
        });
    },
    insert(table,values){
        switch(table){
            case "settings_prefix":
                query(`insert into ${table} values ("${values.join('", "')}") on duplicate key update guildId=${values[0]}, prefix="${values[1]}"`,function(res){
					return res;
				});
				break;
			case 'settings_color':
				query(`insert into ${table} values ("${values.join('", "')}") on duplicate key update guildId=${values[0]}, color="${values[1]}"`,function(res){
					return res;
				});
				break;
			case 'create_lobby_channel':
				query(`insert into ${table} values ("${values.join('","')}") on duplicate key update guildId=${values[0]}, channelId="${values[1]}"`,function(res){
					return res;
				});
				break;
            default:
				query(`insert into ${table} values ("${values.join('", "')}")`,function(res){
					return res;
				})
                break;
        };
    },
	delete(table, guildId){
		query(`delete from ${table} where guildId=${guildId}`)
	},
	getPrefixes(callback){
		query('select * from settings_prefix',function(res){
			return callback(res);
		})
	},
	getColors(callback){
		query('select * from settings_color', function(res){
			return callback(res);
		});
	},
	getLobbys(callback){
		query('select * from create_lobby_channel', function(res){
			return callback(res);
		});
	}
}
function query(q,callback){
    const host = config.db.host;
    const db = config.db.database;
	const user = config.db.user;
	const passwd = config.db.password; 
	const connection = mysql.createConnection({
		host: host,
		user: user,
		password: passwd,
		database: db,
		rowsAsArray: true,
		supportBigNumbers: true,
        bigNumberStrings: true
	});
	connection.connect(function(err) {  
		if (err) throw err;
		connection.query(q, function (err, result) {
			connection.end();
			if(err){
				console.log(err);
			}else{
			    return callback(result);
            }
		})
	});
}