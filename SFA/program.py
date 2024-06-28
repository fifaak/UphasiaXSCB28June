from openai import OpenAI
import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class GuessWordRequest(BaseModel):
    occupation: str
    num_of_word: int
    word: str = ""

# Define your OpenAI client creation logic here
def create_openai_client():
    API_KEY = "sk-jCsvhJjSF0Jaq63NrfZJnvFsvNyXcO6WtuuhIAs70cgR77jo"  # Replace with your actual API key

    return OpenAI(
        api_key=API_KEY,
        base_url="https://api.opentyphoon.ai/v1",
    )

# Define your original functions here
def request_hint(word, client):
    stream = client.chat.completions.create(
        model="typhoon-v1.5x-70b-instruct",
        messages=[
            {
                "role": "system",
                "content": """
                คุณเป็นนักบำบัดการพูดที่กำลังช่วยผู้ป่วยที่มีภาวะเสียการพูดฝึกฝนทักษะการพูดและการสื่อสาร จากโรค Aphasia
                ผู้ป่วยอาจมีปัญหาในการหาคำและการสร้างประโยค คุณมีหน้าที่ช่วยผู้ป่วยให้สามารถคิดคำที่คุณใบ้ออก โดยที่ไม่บอกคำนั้นๆโดยตรง,ใบ้คนไข้โดยหัวข้อดังนี้
                1.ประเภท
                2.ความสามารถจากสิ่งนี้
                3.ลักษณะ
                4.สถานที่
                5.ความเกี่ยวข้อง
                6.กริยา
                ***
                ตัวอย่างที่ 1 การใบ้คุณลักษณะสำหรับคำว่า "แอปเปิ้ล"
                1.ประเภท = "ผลไม้"
                2.ความสามารถจากสิ่งนี้ = "นิยมนำมากิน"
                3.ลักษณะ = "ผลมีสีแดงหรือสีเขียว, ผลมีทรงกลม, ผิวค่อนข้างเรียบ"
                4.สถานที่ = "ปลูกที่สวนผลไม้, ถูกขายที่ร้านขายของชำ, เก็บในตู้เย็น"
                5.ความเกี่ยวข้อง = "สามารถนำมาทำขนมพาย, เป็นประโยชน์ต่อสุขภาพ"
                6.กิริยา = "สามารถกินได้, เก็บผลได้"

                ตัวอย่างที่ 2 การใบ้คุณลักษณะสำหรับคำว่า "หมา"
                1.ประเภท = "สัตว์"
                2.ความสามารถจากสิ่งนี้ = "ใช้เฝ้าบ้าน" 
                3.ลักษณะ = "มีสี่ขา หูสองข้าง และหาง ขนาดและรูปร่างอาจแตกต่างกันไปตามสายพันธุ์, บางสายพันธุ์มีขนสั้น บางสายพันธุ์มีขนยาว มีหลากหลายสี เช่น ขาว ดำ น้ำตาล , ส่วนใหญ่เป็นสัตว์ที่ซื่อสัตย์และจงรักภักดีกับเจ้าของ"
                4.สถานที่ = "อาจจะเจอที่วัด, หน้าบ้าน, หน้าเซเว่น"
                5.ความเกี่ยวข้อง = "เป็นสัตว์เลี้ยง,ถูกฝึกเพื่อทำงานต่าง ๆ เช่น การค้นหาและกู้ภัย การนำทางสำหรับผู้พิการทางสายตา"
                6.กิริยา = "เห่า, วิ่ง, ฉี่ใส่ล้อ " 

                ตัวอย่างที่ 3 การใบ้คุณลักษณะสำหรับคำว่า "พระ"
                1.ประเภท = "บุคคล"
                2.ความสามารถจากสิ่งนี้ = "เป็นที่ยึดเหนี่ยวจิตใจ" 
                3.ลักษณะ = "ห่มผ้าสีส้ม, ไม่ใส่เครื่องประดับ"
                4.สถานที่ = "เจอที่วัด, บางทีมาตามหน้าบ้าน"
                5.ความเกี่ยวข้อง = "คนไทยเคารพนับถือ, เกี่ยวข้องกับศาสนาพุทธ"
                6.กิริยา = "สวดมนต์,บิณฑบาท" 
                ,โดยตอบแค่ การไบ้
                """
            },
            {
                "role": "user",
                "content": f"ผมอยากฝึกพูดคำว่า {word}"
            }
        ],
        max_tokens=200,
        temperature=0.0,
        top_p=1,
        stream=True,
    )
    output = ""
    for chunk in stream:
        if hasattr(chunk, 'choices') and len(chunk.choices) > 0:
            choice = chunk.choices[0]
            if hasattr(choice, 'delta') and hasattr(choice.delta, 'content'):
                output += choice.delta.content
    lines = output.split('\n')
    data_dict = {}
    for line in lines:
        key_value = line.split(' = ')
        if len(key_value) == 2:
            key = key_value[0].split('. ')[1]
            value = key_value[1].strip('\"').split(", ")
            data_dict[key] = value
    return data_dict

def Spc_word(occupation, num_of_word, client):
    stream = client.chat.completions.create(
        model="typhoon-v1.5x-70b-instruct",
        messages=[
            {
                "role": "system",
                "content": f"คุณเป็นนักบำบัดการพูดที่กำลังช่วยผู้ป่วยที่มีภาวะเสียการพูดฝึกฝนทักษะการพูดและการสื่อสาร จากโรค Aphasia, ผู้ป่วยอาจมีปัญหาในการหาคำและการสร้างประโยค ดังนั้นคุณมีหน้าที่หาคำที่ใช้บ่อยๆในอาชีพของผู้ป่วยคนนั้นมา {num_of_word} คำ,โดยตอบเฉพาะคำเท่านั้น"
            },
            {
                "role": "user",
                "content": f"เรามีอาชีพคือ {occupation}"
            }
        ],
        max_tokens=200,
        temperature=0.0,
        top_p=1,
        stream=True,
    )
    output = ""
    for chunk in stream:
        if hasattr(chunk, 'choices') and len(chunk.choices) > 0:
            choice = chunk.choices[0]
            if hasattr(choice, 'delta') and hasattr(choice.delta, 'content'):
                output += choice.delta.content
    if ('\n' in output):
        output = [line.split('. ')[1] for line in output.strip().split('\n')]
    return output

def guess_word(occupation, num_of_word, word, client):
    if occupation:
        set_of_word = Spc_word(occupation, num_of_word, client)
        ds = {word: request_hint(word, client) for word in set_of_word}
        return ds
    else:
        data = request_hint(word, client)
        return {word: data}

# FastAPI endpoint
@app.post("/guess_word")
def guess_word_endpoint(request: GuessWordRequest):
    client = create_openai_client()
    try:
        result = guess_word(request.occupation, request.num_of_word, request.word, client)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# To run the app, use the command: uvicorn <name_of_your_python_file_without_.py>:app --reload
