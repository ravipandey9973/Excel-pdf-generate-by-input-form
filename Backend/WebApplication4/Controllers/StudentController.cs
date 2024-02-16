using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication4.Models;
using System.Configuration;

namespace WebApplication4.Controllers
{
    public class StudentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select RegNo,Name,Major,convert(varchar(10),DateOfJoining,120) as DateOfJoining from dbo.Student";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CseAppDB"].ConnectionString))
            using (var cmd =  new SqlCommand(query,con))
            using (var da = new SqlDataAdapter(cmd))
            {


                cmd.CommandType = CommandType.Text;
                con.Open();
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
            
        }
        public string Post(Student s)
        {
            try
            {
                string query = @"Insert into dbo.Student (Name,Major,DateOfJoining) values
                (
               
                '" + s.Name + @"',
                 '"+s.Major+@"',
                '"+s.DateOfJoining+@"'
                )
                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CseAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {


                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "successfully Added";

            }
            catch (Exception)
            {
                return "Failed to Added";
            }
        }
        public  string Put(Student s)
        {
            try
            {
                string query = @"Update dbo.Student set
                Name = '" + s.Name + @"',
                Major = '" + s.Major + @"',
                DateOfJoining = '" + s.DateOfJoining + @"'
                where RegNo = " + s.RegNo + @"
                  ";

              DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CseAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {


                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "Successfully updated";

            }
            catch(Exception)
            {
                return "Failed to Updated";
            }
        }
        public string   Delete(int id)
        {
            try
            {
                string query = @"delete from  dbo.Student
                           where RegNo="+id+@"
                     ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CseAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query,con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "Deleted successfully";
            }
            catch (Exception )
            {
                return "Failed to Deleted";
            }
        }
    }
}
