import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~~/types/database.types';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const supabase = serverSupabaseClient<Database>(event);

    if (!supabase) {
        throw createError({
            statusMessage: "Database client failed to initialize.",
            statusCode: 404
        })
    }

    try {
        (await supabase).from('users').insert({
            id: body.record.id,
            name: "Test User",
            email: body.record.email,
        })

        return "User created successfully."
    } catch {
        throw createError({
            statusMessage: "Internal Server Error.",
            statusCode: 500
        })
    }
})