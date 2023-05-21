using Microsoft.Data.SqlClient;

namespace whatcha_drinking.Utils
{
    public static class DbUtils
    {
        public static string GetString(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetString(ordinal);   
        }

        public static DateTime? GetDateTime(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if(reader.IsDBNull(ordinal))
            {
                return null;
            }
            return reader.GetDateTime(ordinal);
        }
        public static int GetInt(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            return reader.GetInt32(ordinal);
        }

        public static int? GetNullableInt(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }
            return reader.GetInt32(ordinal);
        }

        public static bool? GetBool(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }
            return reader.GetBoolean(ordinal);
        }

        public static void AddParameter(SqlCommand cmd, string name, object value)
        {
            if(value == null)
            {
                cmd.Parameters.AddWithValue(name, DBNull.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue(name, value);
            }
        }

    }


}
