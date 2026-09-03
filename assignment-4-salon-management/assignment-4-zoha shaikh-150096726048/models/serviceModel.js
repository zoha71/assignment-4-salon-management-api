const supabase = require("../config/supabase");

const getServicesBySalon = async (salonId) => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("salonId", salonId);

    if (error) {
        throw error;
    }

    return data;
};

const getServiceById = async (id) => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const createService = async (serviceData) => {
    const { data, error } = await supabase
        .from("services")
        .insert([serviceData])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const updateService = async (id, serviceData) => {
    const { data, error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const deleteService = async (id) => {
    const { data, error } = await supabase
        .from("services")
        .delete()
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

const getAvailableServices = async () => {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("isAvailable", true);

    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
    getServicesBySalon,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getAvailableServices
};