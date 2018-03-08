
create table people
(
   id int not null unique auto_increment,
   sid int not null primary key , 
   name varchar(50) not null, 
   designation varchar(255) not null, 
   experience int not null, 
   mobile_no int , 
   email varchar(100) not null unique,
   area_of_exper varchar(200) not null, 
   username varchar(40) not null unique,
   password char(60) not null,
   image varchar(255) not null,
   publications text 
   );
   
   
   create table p_edu
   (
     id int auto_increment primary key,
     s_id int not null,
     degree varchar(20),
     spec varchar(100),
     univ varchar(100),
     graduated_in int,
     foreign key(s_id) references people(sid)  ON DELETE CASCADE
   )
   
   create table p_project
   (
    pid int auto_increment primary key,
     s_id int not null,
     p_title varchar(60),
     advisees varchar(100),
     lab varchar(100),
     status varchar(30),
     foreign key(s_id) references people(sid)  ON DELETE CASCADE
   )
   
  //======passsport.js===============
   SELECT pe.*,p.* FROM  p_edu AS pe INNER JOIN people AS p ON pe.s_id = p.sid AND p.sid = 333;
   
   	
ALTER TABLE p_project
ADD FOREIGN KEY (s_id) REFERENCES people(sid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE p_edu DROP FOREIGN KEY p_edu_ibfk_3;
ALTER TABLE p_edu DROP CONSTRAINT s_id;

ALTER TABLE p_edu
ADD CONSTRAINT FK FOREIGN KEY (s_id)
    REFERENCES people(sid) ON DELETE CASCADE ;

SELECT
  constraint_name
FROM
  information_schema.REFERENTIAL_CONSTRAINTS
WHERE
  constraint_schema = 'my_schema' AND table_name = 'p_edu';


| constraint_name |
+-----------------+
| p_edu_ibfk_3    |
| p_edu_ibfk_1    |
| p_edu_ibfk_2    |
+-----------------+

ALTER TABLE people MODIFY COLUMN mobile_no VARCHAR(100);

alter table p_project  add column amount varchar(40);

update p_project set amount="25,000" where pid="7";


create table tl (
 id int auto_increment primary key,
 TLdate varchar(20),
 name varchar(20),
 topic varchar(20)
)

insert into tl (TLdate,name,topic) values("2017-09-13","Vikram Kumar","Application of MATLAB to Various Streams of Engg.");