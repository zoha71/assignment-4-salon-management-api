const supabase = require("../config/supabase");

const getAllSalons = async () => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

const getSalonById = async (id) => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const createSalon = async (salonData) => {
    const { data, error } = await supabase
        .from("salons")
        .insert([salonData])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const updateSalon = async (id, salonData) => {
    const { data, error } = await supabase
        .from("salons")
        .update(salonData)
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const deleteSalon = async (id) => {
    const { data, error } = await supabase
        .from("salons")
        .delete()
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const getTopSalons = async () => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .order("rating", { ascending: false })
        .limit(5);

    if (error) {
        throw error;
    }

    return data;
};

const getSalonsByCity = async (city) => {
    const { data, error } = await supabase
        .from("salons")
        .select("*")
        .ilike("city", city);

    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
};