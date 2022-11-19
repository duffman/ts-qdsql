

export const getUserDetails = () => {
	const struct = {
		  schema: "",
		  select: {
			  columns: [
				  "sumt.user_id",
				  "sumt.user_name",
				  "sumt.user_email",
				  "sumt.user_country",
				  "scmt.country_name",
				  "scmt.common_service_ofc_id",
				  "scmt.is_valid AS user_country_active"
			  ]
		  }
	}
}

/*
 SELECT sumt.user_id
 ,sumt.user_name, sumt.user_email, sumt.user_country, scmt.country_name, scmt.common_service_ofc_id,scmt.is_valid AS user_country_active, sumt.user_pref_language, sumt.unit_id, sumt1.unit_name,sumt1.unit_no, sumt1.is_valid AS unit_active, sumt.is_admin, sumt.status,sumt.user_role, srmt.role_name, srmt.role_group, srmt.role_level, srmt.status_active AS user_role_active, sumt.start_date, sumt.end_date, sumt.delete_date, sumt.created_on,sumt.created_by, sumt.updated_on, sumt.updated_by
 FROM samla_schema.samla_user_master_t sumt
 LEFT OUTER JOIN samla_schema.samla_country_master_t scmt
 ON sumt.user_country = scmt.country_id
 LEFT OUTER JOIN "samla_schema".samla_role_master_t srmt
 ON sumt.user_role = srmt.role_id
 LEFT OUTER JOIN "samla_schema".samla_unit_master_t sumt1
 ON sumt.unit_id = sumt1.unit_seq_id
 WHERE sumt.user_email ILIKE 'fabio.cammilli@ingka.com'
 GROUP BY sumt.user_id, sumt.user_name, sumt.user_email, sumt.user_country
 , scmt.country_name, scmt.common_service_ofc_id, scmt.is_valid, sumt.user_pref_language, sumt.unit_id
 , sumt1.unit_name, sumt1.unit_no, sumt1.is_valid, sumt.is_admin, sumt.status
 , sumt.user_role, srmt.role_name, srmt.role_group, srmt.role_level, srmt.status_active
 , sumt.start_date, sumt.end_date, sumt.delete_date, sumt.created_on, sumt.created_by, sumt.updated_on, sumt.updated_by
 */
