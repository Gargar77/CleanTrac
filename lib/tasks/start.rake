
# exec  will execute the command in bash and will not return to the process when finhised
# that is why the && operator is used to make sure all processes execute synchronously
task :start do
    exec 'sudo service postgresql start && foreman start -p 3000'
    
end