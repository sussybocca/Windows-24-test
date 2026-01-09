import bcrypt from 'bcryptjs'
import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { username, email, password } = req.body

  const hash = await bcrypt.hash(password, 12)

  await supabase.from('users').insert({
    username,
    email,
    password_hash: hash,
    two_factor: false
  })

  res.json({ success: true })
}
