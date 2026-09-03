const supabase = require("../config/supabase");

const createUser = async (userData) => {
    const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const getUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
    createUser,
    getUserByEmail
};